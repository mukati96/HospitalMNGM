import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageKeys } from 'src/app/constants/storage';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';
declare var JitsiMeetExternalAPI: any;

@Component({
    selector: 'app-jitsi',
    templateUrl: './jitsi.component.html',
    styleUrls: ['./jitsi.component.scss']
})
export class JitsiComponent implements OnInit, AfterViewInit {
    domain: string = "meet.jit.si"; // For self hosted use your domain
    room: any;
    patientId!: string;
    agenda!: string;
    options: any;
    api: any;
    // For Custom Controls
    isAudioMuted = false;
    isVideoMuted = false;
    userInfo: any = this.storage.getFromLocalStorage(StorageKeys.USER_INFO);

    constructor(private router: Router,
                private http: HttpService,
                private route: ActivatedRoute,
                private storage: StorageService) { }

    ngOnInit(): void {
        this.room = this.route.snapshot.params['id']; // Set your room name
        this.patientId = this.route.snapshot.queryParams['patientId']; // Set your room name
        this.agenda = this.route.snapshot.queryParams['agenda']; // Set your room name
    }

    ngAfterViewInit(): void {
        this.start();
    }

    start() {
        this.options = {
            roomName: this.room,
            width: '100%',
            height: '100%',
            configOverwrite: { prejoinPageEnabled: false },
            interfaceConfigOverwrite: {
                // overwrite interface properties
            },
            parentNode: document.querySelector('#jitsi-iframe'),
            userInfo: {
                displayName: this.userInfo.name,
                email: this.userInfo.email,
            }
        }
        this.api = new JitsiMeetExternalAPI(this.domain, this.options);

        // Event handlers
        this.api.addEventListeners({
            readyToClose: this.handleClose,
            participantLeft: this.handleParticipantLeft,
            participantJoined: this.handleParticipantJoined,
            videoConferenceJoined: this.handleVideoConferenceJoined,
            videoConferenceLeft: this.handleVideoConferenceLeft,
            audioMuteStatusChanged: this.handleMuteStatus,
            videoMuteStatusChanged: this.handleVideoStatus,
            recordingLinkAvailable: this.recordingLinkAvailable,
            recordingStatusChanged: this.recordingStatusChanged
        });
    }

    handleClose = () => {
        window.close()  
    }

    handleParticipantLeft = async (participant: any) => {
        const data = await this.getParticipants();
    }

    handleParticipantJoined = async (participant: any) => {
        const data = await this.getParticipants();
    }

    handleVideoConferenceJoined = async (participant: any) => {
        const data = await this.getParticipants();
        this.http.post(URLS.CALL_START, {
            "agenda": this.agenda,
            "patient": this.patientId,
            "care_manager": this.userInfo.id,
            "call_meet_link": window.location.href
        }).subscribe();
    }

    handleVideoConferenceLeft = (participant: any) => {
        this.http.put(URLS.CALL_END, {
            "patient": this.patientId,
            "care_manager": this.userInfo.id,
            "call_meet_link": window.location.href
        }).subscribe({
            next: (res) => {
                window.close()  
            }
        });
    }

    recordingStatusChanged = (data: any) => {
        if(data.on) {
            this.executeCommand('startRecording');
            console.log('recording started');
        } else {
            console.log('recording started');
        }
    }

    recordingLinkAvailable = (data: any) => {
        console.log(data);
    }

    handleMuteStatus = (audio: any) => {
        // console.log("handleMuteStatus", audio); // { muted: true }
    }

    handleVideoStatus = (video: any) => {
        // console.log("handleVideoStatus", video); // { muted: true }
    }

    getParticipants() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.api.getParticipantsInfo()); // get all participants
            }, 500)
        });
    }

    executeCommand(command: string) {
        if (command == 'hangup') {
            window.close()  
            return;
        }
        if (command == 'toggleAudio') {
            this.isAudioMuted = !this.isAudioMuted;
        }
        if (command == 'toggleVideo') {
            this.isVideoMuted = !this.isVideoMuted;
        }
        if(command == 'startRecording') {
            this.api.executeCommand(command, {
                mode: 'file', //recording mode, either `local`, `file` or `stream`.
                // dropboxToken: string, //dropbox oauth2 token.
                // onlySelf: boolean,  //Whether to only record the local streams. Only applies to `local` recording mode.
                shouldShare: true, //whether the recording should be shared with the participants or not. Only applies to certain jitsi meet deploys.
                // rtmpStreamKey: string, //the RTMP stream key.
                // rtmpBroadcastID: string, //the RTMP broadcast ID.
                // youtubeStreamKey: string, //the youtube stream key.
                // youtubeBroadcastID: string //the youtube broacast ID.
            });
        }
    }
}

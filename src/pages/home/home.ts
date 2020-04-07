import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CardIO } from '@ionic-native/card-io';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Clipboard } from '@ionic-native/clipboard';
import { VideoPlayer } from '@ionic-native/video-player';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private camera: Camera,private cardIO: CardIO,private photoViewer: PhotoViewer,private videoPlayer: VideoPlayer,private clipboard: Clipboard) {

  }
  Camera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
     this.camera.getPicture(options).then((imageData) => {
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    }); 
    }

    CardIO(){
      this.cardIO.canScan()
       .then(
         (res: boolean) => {
           if(res){
             let options = {
               requireExpiry: true,
               requireCVV: false,
               requirePostalCode: false
             };
             this.cardIO.scan(options);
           }
         }
       );
     }
    
     PhotoViewer(){
     this.photoViewer.show('https://i.ytimg.com/vi/GmF1O_k3nH8/sddefault.jpg');  
     }
     
     Clipboard(){
      this.clipboard.copy('Hello world');

      this.clipboard.paste().then(
         (resolve: string) => {
            alert(resolve);
          },
          (reject: string) => {
            alert('Error: ' + reject);
          }
        );
      
      this.clipboard.clear();
     }


     VideoPlayer(){
      this.videoPlayer.play('URL = https://www.googleapis.com/youtube/v3/videos?part=snippet&id={video IDs}&key={AIzaSyBEbPUtlH9aX_Isl95C3dgIr3npcKklZCU}').then(() => {
        console.log('video completed');
       }).catch(err => {
        console.log(err);
       });
     }


}

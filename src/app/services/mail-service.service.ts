import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailServiceService {

  url = 'http://3.144.224.189/mail/';

  constructor(public http: HttpClient) { }

  sendMail(mailData: any) {
    return this.http.post(this.url + 'send', mailData);
  }

}

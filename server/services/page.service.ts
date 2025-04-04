import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: "root"
})
export class PageService {
  private authPageStatus = new BehaviorSubject<boolean>(false)
  currentStatus = this.authPageStatus.asObservable()

  private authCreateApp = new BehaviorSubject<boolean>(false)
  currentCanCreateApp = this.authCreateApp.asObservable()

  constructor() { }

  changeStatus(status: boolean) {
    this.authPageStatus.next(status)
  }

  changeCreateAppStatus(status: boolean) {
    this.authCreateApp.next(status)
  }
}

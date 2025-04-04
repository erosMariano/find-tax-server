import { DOCUMENT } from "@angular/common"
import { Inject, Injectable } from "@angular/core"

export interface KeyVal {
  key: string,
  val: string
}

@Injectable({
  providedIn: "root"
})
export class StorageService {
  private localStorage = this.document.defaultView?.localStorage

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) { }

  getItem(key: string): string | null | undefined {
    return this.localStorage?.getItem(key)
  }

  setItem(keyVal: KeyVal[]) {
    for (let i = 0; i < keyVal.length; ++i) {
      this.localStorage?.setItem(keyVal[i].key, keyVal[i].val)  
    }
  }

  setLastLogin(date: Date) {
    this.localStorage?.setItem("last_login", date.toISOString())
  }
}

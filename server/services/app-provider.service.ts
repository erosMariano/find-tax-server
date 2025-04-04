import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: "root"
})
export class AppProviderService {

  constructor(private httpClient: HttpClient) { }

  getProviderApp(uuid: string) {
    return this.httpClient.get(`${environment.server}/app_provider/${uuid}`)
  }
}

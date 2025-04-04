import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "../../environments/environment"
import { Observable } from "rxjs"

@Injectable({
  providedIn: "root"
})
export class AppsService {

  constructor(
    private http: HttpClient
  ) { }

  getApp(uuid: string): Observable<unknown> {
    return this.http.get<any>(`${environment.server}/app/${uuid}`)
  }

  getApps(): Observable<unknown> {
    return this.http.get<any>(`${environment.server}/apps`)
  }

  createAppRating(payload: any, app_uuid: string) {
    return this.http.post<any>(`${environment.server}/app_rating/${app_uuid}`, payload)
  }

  getAppRatings(app_uuid: string) {
    return this.http.get<any>(`${environment.server}/app_rating/${app_uuid}`)
  }

  getTags(): Observable<unknown> {
    return this.http.get<any>(`${environment.server}/tags`)
  }

  getAppsByPage(limit: number, page: number): Observable<unknown> {
    return this.http.get<any>(`${environment.server}/apps/${limit}/${page}`)
  }
}

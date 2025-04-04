import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "../../environments/environment"
import { Observable, map } from "rxjs"
import { DomSanitizer, SafeHtml, SafeResourceUrl } from "@angular/platform-browser"
import { SessionService } from "./session.service"

@Injectable({
  providedIn: "root"
})
export class GeneralService {

  constructor(
    private http: HttpClient,
    private domSnitizer: DomSanitizer,
    private sessionService: SessionService
  ) { }

  async getTempAndCity(data: any) {
    return this.http.get<any>(`${environment.server}/cityandtemp`, {
      headers: data
    })
  }

  async getSelic() {
    return this.http.get<any>(`${environment.server}/selic`)
  }

  async createAtalho(data: any) {
    return this.http.post<any>(`${environment.server}/create/atalho`, data,  { responseType: "text" as "json" })
  }

  async createApp(data: any) {
    return this.http.post<any>(`${environment.server}/create/app`, data)
  }

  upload(file: File, formKeyValue: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData()
    formData.append(formKeyValue, file)
    const req = new HttpRequest("POST", `${environment.server}/upload`, formData)

    return this.http.request(req)
  }

  getFiles(): Observable<any> {
    // return this.http.get(`${environment.server}/files`)
    return new Observable
  }

  getUSD(): Observable<unknown> {
    return this.http.get<unknown>(`${environment.server}/usd`)
  }

  getEUR(): Observable<unknown> {
    return this.http.get<unknown>(`${environment.server}/eur`)
  }

  getGhostNoticias(): Observable<unknown> {
    return this.http.get<unknown>(`${environment.findGhostPosts}?key=${environment.findGhostContentAPIKey}`)
  }

  getImpostometroData(): Observable<unknown> {
    return this.http.get<unknown>(`${environment.server}/impostometro`)
  }

  getAtalhos(): Observable<unknown> {
    return this.http.get<unknown>(`${environment.server}/atalhos`)
  }

  getAtalhoImg(atalhoUUID: string): Observable<unknown> {
    return this.http.get<unknown>(`${environment.server}/atalho/${atalhoUUID}`)
  }

  getSafeUrl(urlOrPath: string): SafeResourceUrl {
    return this.domSnitizer.bypassSecurityTrustResourceUrl(urlOrPath)
  }

  sendRecoveryEmail(email: string): Observable<unknown> {
    return this.http.post<unknown>(`${environment.server}/password/recovery`, { email })
  }

  changePassword(password: string, jwt: string): Observable<unknown> {
    return this.http.post<unknown>(`${environment.server}/password/reset/${jwt}`, { password })
  }

  getPfpAsSafeUrl(): SafeResourceUrl {
    const pfp = this.sessionService.getAccountFields()?.pfp || "/assets/static/default-avatar.webp"
    return this.domSnitizer.bypassSecurityTrustResourceUrl(pfp)
  }

  loadSvg(svgPath: string): Observable<SafeHtml> {
    return this.http.get(svgPath, { responseType: "text" }).pipe(
      map(svg => this.domSnitizer.bypassSecurityTrustHtml(svg))
    )
  }

  getAccountID(): Observable<unknown> {
    return this.http.get<unknown>(`${environment.server}/acc/id`)
  }

  getAccountLastLoggedAt(): Observable<unknown> {
    return this.http.get<unknown>(`${environment.server}/acc/last/logged`)
  }
}

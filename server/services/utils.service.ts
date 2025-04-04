import { Injectable } from "@angular/core"
import { FormGroup } from "@angular/forms"

@Injectable({
  providedIn: "root"
})
export class UtilsService {

  constructor() { }

  markFormGroupAsDirty(form: FormGroup) {
    Object.values(form.controls).forEach(control => {
      if (!control.valid) {
        control.markAsDirty()
      } else {
        control.markAsPristine()
      }
    })
  }

  formatCurrency(value: number ) {
    return value.toFixed(2).replace(/\./g, ",")
  }

  limitStringSize(string: string, limit: number) {
    return string.length > limit ? string.slice(0, limit) + "..." : string
  }

  formatPtBrDateAndHour(date: Date) {
    return date.toLocaleString("pt-BR")
  }

  isTodayBool(dateString: string): boolean {
    console.log(dateString)
    
    if (!dateString) {
      return false
    }

    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = date.getMonth() + 1 // getMonth() começa do 0. Então 0 -> janeiro, 1 -> fevereiro, etc...
    const day = date.getDate()
    const todayYear = new Date().getFullYear()
    const todayMonth = new Date().getMonth() + 1
    const todayDay = new Date().getDate()

    if (year <= todayYear && month <= todayMonth && day <= todayDay) {
      return true
    }

    return false
  }
}

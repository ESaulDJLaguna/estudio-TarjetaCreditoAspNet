import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TarjetaCredito } from '../models/TarjetaCredito';

@Injectable({
  providedIn: 'root',
})
export class TarjetaService {
  private myAppUrl = 'https://localhost:44338/';
  private miApiUrl = 'api/TarjetaCredito/';
  list!: TarjetaCredito[];
  private actualizarFormulario = new BehaviorSubject<TarjetaCredito>({} as any);

  constructor(private http: HttpClient) {}

  gurdarTarjeta(tarjeta: TarjetaCredito): Observable<TarjetaCredito> {
    return this.http.post<TarjetaCredito>(
      this.myAppUrl + this.miApiUrl,
      tarjeta
    );
  }

  eliminarTarjeta(id: number | undefined): Observable<TarjetaCredito> {
    return this.http.delete<TarjetaCredito>(this.myAppUrl + this.miApiUrl + id);
  }

  obtenerTarjetasDeBD() {
    this.http
      .get(this.myAppUrl + this.miApiUrl)
      .toPromise()
      .then((data) => {
        this.list = data as TarjetaCredito[];
      });
  }

  actualizarTarjetaCreditoBD(
    id: number | undefined,
    tarjeta: TarjetaCredito
  ): Observable<TarjetaCredito> {
    return this.http.put<TarjetaCredito>(
      this.myAppUrl + this.miApiUrl + id,
      tarjeta
    );
  }

  actualizarRellenarFormulario(tarjeta: TarjetaCredito) {
    this.actualizarFormulario.next(tarjeta);
  }

  obtenerTarjeta(): Observable<TarjetaCredito> {
    return this.actualizarFormulario.asObservable();
  }
}

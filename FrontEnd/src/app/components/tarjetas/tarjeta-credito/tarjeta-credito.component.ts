import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css'],
})
export class TarjetaCreditoComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  subscription!: Subscription;
  tarjeta!: TarjetaCredito;
  idTarjeta: number | undefined = 0;

  constructor(
    private formBuilder: FormBuilder,
    private tarjetaService: TarjetaService,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      titular: ['', [Validators.required]],
      numeroTarjeta: [
        '',
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16),
        ],
      ],
      fechaExpiracion: [
        '',
        [Validators.required, Validators.maxLength(5), Validators.minLength(5)],
      ],
      cvv: [
        '',
        [Validators.required, Validators.maxLength(3), Validators.minLength(3)],
      ],
    });
  }

  ngOnInit(): void {
    this.subscription = this.tarjetaService
      .obtenerTarjeta()
      .subscribe((data) => {
        this.tarjeta = data;
        this.form.patchValue({
          titular: this.tarjeta.titular,
          numeroTarjeta: this.tarjeta.numeroTarjeta,
          fechaExpiracion: this.tarjeta.fechaExpiracion,
          cvv: this.tarjeta.cvv,
        });
        this.idTarjeta = this.tarjeta.id;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  guardarTarjeta() {
    if (this.idTarjeta === 0 || this.idTarjeta === undefined) {
      this.agregar();
    } else {
      this.editar();
    }
  }

  agregar() {
    const tarjeta: TarjetaCredito = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    };
    this.tarjetaService.gurdarTarjeta(tarjeta).subscribe((data) => {
      this.toastr.success('Registro Agregado', 'La tarjeta fue agregada');
      this.tarjetaService.obtenerTarjetasDeBD();
      this.form.reset();
    });
  }

  editar() {
    const tarjeta: TarjetaCredito = {
      id: this.tarjeta.id,
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    };

    this.tarjetaService
      .actualizarTarjetaCreditoBD(this.idTarjeta, tarjeta)
      .subscribe((data) => {
        this.toastr.info('Registro Actualizado', 'La tarjeta fue actualizada');
        this.tarjetaService.obtenerTarjetasDeBD();
        this.form.reset();
        this.idTarjeta = 0;
      });
  }
}

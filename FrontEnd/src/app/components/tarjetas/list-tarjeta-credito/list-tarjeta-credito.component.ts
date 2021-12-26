import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-list-tarjeta-credito',
  templateUrl: './list-tarjeta-credito.component.html',
  styleUrls: ['./list-tarjeta-credito.component.css'],
})
export class ListTarjetaCreditoComponent implements OnInit {
  constructor(
    public tarjetaService: TarjetaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.tarjetaService.obtenerTarjetasDeBD();
  }

  eliminarTarjeta(id: number | undefined) {
    if (confirm('¿Está seguro que quiere eliminar el registro?')) {
      this.tarjetaService.eliminarTarjeta(id).subscribe((data) => {
        this.toastr.warning('Registro eliminado', 'La tarjeta fue eliminada');
        this.tarjetaService.obtenerTarjetasDeBD();
      });
    }
  }

  editarTarjeta(tarjeta: TarjetaCredito) {
    this.tarjetaService.actualizarRellenarFormulario(tarjeta);
  }
}

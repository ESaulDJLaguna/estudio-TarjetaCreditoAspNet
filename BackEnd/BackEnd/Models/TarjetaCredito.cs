using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

//TODO... SE CREO ESTÁ CLASE DE CERO 
namespace BackEnd.Models
{
    // Esta clase representa una tabla en la base de datos...
    public class TarjetaCredito
    {
        // ... cada propiedad representa un campo
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR(100)")]
        public String Titular { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR(16)")]
        public String NumeroTarjeta { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR(5)")]
        public String FechaExpiracion { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR(3)")]
        public String CVV { get; set; }
    }
}

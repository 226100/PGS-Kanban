using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pgs.Kanban.Domain.Models
{
    public class Card
    {
        [Key]
        public int Id { get; set; }

        public int ListId { get; set; }

        public virtual List List { get; set; }

        public string Name { get; set; }
    }
}

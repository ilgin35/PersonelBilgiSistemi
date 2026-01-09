using System.ComponentModel.DataAnnotations;

namespace PersonnelSystem.Backend.Models
{
    public class Personnel
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string RegistryNo { get; set; } = string.Empty; // Sicil No

        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Surname { get; set; } = string.Empty;

        [Required]
        public int DepartmentId { get; set; }
        public Department? Department { get; set; }

        [Required]
        public int TitleId { get; set; }
        public Title? Title { get; set; }

        public DateTime StartDate { get; set; } = DateTime.UtcNow;

        [MaxLength(255)]
        public string? PhotoPath { get; set; }

        public bool IsActive { get; set; } = true;
    }
}

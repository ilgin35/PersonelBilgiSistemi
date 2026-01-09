using Microsoft.EntityFrameworkCore;
using PersonnelSystem.Backend.Models;

namespace PersonnelSystem.Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Department> Departments { get; set; }
        public DbSet<Title> Titles { get; set; }
        public DbSet<Personnel> Personnels { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Unique Constraint for RegistryNo
            modelBuilder.Entity<Personnel>()
                .HasIndex(p => p.RegistryNo)
                .IsUnique();

            // Seed Departments
            modelBuilder.Entity<Department>().HasData(
                new Department { Id = 1, Name = "HR", Description = "Human Resources" },
                new Department { Id = 2, Name = "IT", Description = "Information Technology" },
                new Department { Id = 3, Name = "Sales", Description = "Sales Department" }
            );

            // Seed Titles
            modelBuilder.Entity<Title>().HasData(
                new Title { Id = 1, Name = "Manager", Description = "Department Manager" },
                new Title { Id = 2, Name = "Developer", Description = "Software Developer" },
                new Title { Id = 3, Name = "Intern", Description = "Junior Position" }
            );

            // Seed Personnel
            modelBuilder.Entity<Personnel>().HasData(
                new Personnel
                {
                    Id = 1,
                    RegistryNo = "1001",
                    Name = "Ali",
                    Surname = "Veli",
                    DepartmentId = 1, // HR
                    TitleId = 1, // Manager
                    StartDate = new DateTime(2023, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                    IsActive = true,
                    PhotoPath = null
                }
            );
        }
    }
}

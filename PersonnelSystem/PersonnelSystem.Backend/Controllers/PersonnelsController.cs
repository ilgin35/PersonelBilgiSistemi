using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonnelSystem.Backend.Data;
using PersonnelSystem.Backend.Models;

namespace PersonnelSystem.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonnelsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public PersonnelsController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/Personnels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Personnel>>> GetPersonnels()
        {
            return await _context.Personnels
                .Include(p => p.Department)
                .Include(p => p.Title)
                .ToListAsync();
        }

        // GET: api/Personnels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Personnel>> GetPersonnel(int id)
        {
            var personnel = await _context.Personnels
                .Include(p => p.Department)
                .Include(p => p.Title)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (personnel == null)
            {
                return NotFound();
            }

            return personnel;
        }

        // POST: api/Personnels
        [HttpPost]
        public async Task<ActionResult<Personnel>> PostPersonnel(Personnel personnel)
        {
            _context.Personnels.Add(personnel);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PersonnelExists(personnel.RegistryNo)) // Check by registry no uniqueness
                {
                    return Conflict("Personnel with this Registry No already exists.");
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPersonnel", new { id = personnel.Id }, personnel);
        }

        // PUT: api/Personnels/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersonnel(int id, Personnel personnel)
        {
            if (id != personnel.Id)
            {
                return BadRequest();
            }

            _context.Entry(personnel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonnelExistsId(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Personnels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersonnel(int id)
        {
            var personnel = await _context.Personnels.FindAsync(id);
            if (personnel == null)
            {
                return NotFound();
            }

            _context.Personnels.Remove(personnel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Personnels/upload-photo
        [HttpPost("upload-photo")]
        public async Task<IActionResult> UploadPhoto(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var photoUrl = "/uploads/" + uniqueFileName;
            return Ok(new { filePath = photoUrl });
        }

        private bool PersonnelExists(string registryNo)
        {
            return _context.Personnels.Any(e => e.RegistryNo == registryNo);
        }

        private bool PersonnelExistsId(int id)
        {
            return _context.Personnels.Any(e => e.Id == id);
        }
    }
}

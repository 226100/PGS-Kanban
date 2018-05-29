using Microsoft.AspNetCore.Mvc;
using Pgs.Kanban.Domain.Dtos;
using Pgs.Kanban.Domain.Services;

namespace Pgs.Kanban.Api.Controllers
{
    [Route("api/[controller]")]
    public class ListController : Controller
    {
        private readonly ListService _listService;

        public ListController()
        {
            _listService = new ListService();
        }

        [HttpPost]
        public IActionResult AddList([FromBody] AddListDto addListDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = _listService.AddList(addListDto);

            if (result == null)
            {
                return BadRequest();
            }

            return Ok(result);
        }

        [HttpPut("{id}")]
        public IActionResult EditList([FromBody] EditListDto editListDto, int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = _listService.EditList(editListDto, id);

            if (!result)
            {
                return BadRequest();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteList(int id)
        {
            var result = _listService.DeleteList(id);

            if (!result)
            {
                return BadRequest();
            }

            return NoContent();
        }
    }
}


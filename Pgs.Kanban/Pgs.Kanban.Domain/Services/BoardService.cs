using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Pgs.Kanban.Domain.Dtos;
using Pgs.Kanban.Domain.Models;

namespace Pgs.Kanban.Domain.Services
{
    public class BoardService
    {
        private readonly KanbanContext _context;

        public BoardService()
        {
            _context = new KanbanContext();
        }

        public BoardDto GetBoard()
        {
            var board = _context.Boards
                .Include(b => b.Lists)
                .ThenInclude(c => c.Cards)
                .LastOrDefault();

            if (board == null)
            {
                return null;
            }

            var boardDto = new BoardDto()
            {
                Id = board.Id,
                Name = board.Name,
                Lists = board.Lists.Select(l => new ListDto()
                {
                    Id = l.Id,
                    BoardId = l.BoardId,
                    Name = l.Name,
                    Cards = l.Cards.Select(c => new CardDto()
                    {
                        Id = c.Id,
                        ListId = c.ListId,
                        Name = c.Name
                    }).ToList()
                }).ToList()
            };

            return boardDto;
        }

        public BoardDto CreateBoard(CreateBoardDto createBoardDto)
        {
            var board = new Board()
            {
                Name = createBoardDto.Name
            };

            _context.Boards.Add(board);
            _context.SaveChanges();

            return ConstructBoardDto(board);
        }

        public bool EditBoard(EditBoardNameDto editBoardNameDto, int id)
        {
            var board = GetBoardById(id);
            if (board == null)
            {
                return false;
            }

            if (board.Name == editBoardNameDto.Name)
            {
                return true;
            }
            board.Name = editBoardNameDto.Name;
            return _context.SaveChanges() > 0;
        }

        private BoardDto ConstructBoardDto(Board board)
        {
            return new BoardDto()
            {
                Id = board.Id,
                Name = board.Name
            };
        }

        private Board GetBoardById(int id)
        {
            return _context.Boards.SingleOrDefault(x => x.Id == id);
        }
    }
}
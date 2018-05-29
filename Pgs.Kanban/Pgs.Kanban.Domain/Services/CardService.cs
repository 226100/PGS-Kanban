using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Pgs.Kanban.Domain.Dtos;
using Pgs.Kanban.Domain.Models;

namespace Pgs.Kanban.Domain.Services
{
    public class CardService
    {
        private readonly KanbanContext _context;

        public CardService()
        {
            _context = new KanbanContext();
        }

        public CardDto AddCard(AddCardDto addCardDto)
        {
            if (!ListExists(addCardDto.ListId))
            {
                return null;
            }

            var card = new Card
            {
                Name = addCardDto.Name,
                ListId = addCardDto.ListId
            };

            _context.Cards.Add(card);
            var resultOfAdding = _context.SaveChanges();

            if (resultOfAdding == 0)
            {
                return null;
            }

            var cardDto = new CardDto
            {
                Id = card.Id,
                ListId = card.ListId,
                Name = card.Name
            };

            return cardDto;
        }

        public bool EditCard(EditCardDto editCardDto)
        {
            var card = GetCard(editCardDto.Id);
            if (card == null)
            {
                return false;
            }

            card.Name = editCardDto.Name;
            _context.Entry(card).State = EntityState.Modified;

            var result = _context.SaveChanges();
            return result > 0;
        }

        public bool DeleteCard(int id)
        {
            var card = GetCard(id);
            if (card == null)
            {
                return false;
            }

            _context.Cards.Remove(card);
            var result = _context.SaveChanges();
            return result > 0;
        }

        private bool ListExists(int id)
        {
            return _context.Lists.Any(x => x.Id == id);
        }

        private Card GetCard(int id)
        {
            var list = _context.Cards.FirstOrDefault(x => x.Id == id);
            return list;
        }
    }
}
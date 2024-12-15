"use client";

import { useState, useEffect } from "react";
import TicketCard from "../components/TicketCard";
import Filter from "../components/Filter";

interface Ticket {
  id: number;
  price: number;
  stops: number;
  origin: string;
  destination: string;
}

const conversionRates = {
  USD: 1,
  RUB: 92,
  EUR: 0.92,
};

const Home = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [stopsFilter, setStopsFilter] = useState<number | null>(null);
  const [currency, setCurrency] = useState<"USD" | "RUB" | "EUR">("USD");

  useEffect(() => {
    const fetchTickets = async () => {
      const res = await fetch("/tickets.json");
      const data: Ticket[] = await res.json();
      const sortedData = data.sort((a, b) => a.price - b.price);
      setTickets(sortedData);
      setFilteredTickets(sortedData);
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    if (stopsFilter !== null) {
      setFilteredTickets(tickets.filter((t) => t.stops === stopsFilter));
    } else {
      setFilteredTickets(tickets);
    }
  }, [stopsFilter, tickets]);

  const convertPrice = (price: number) => {
    return (price * conversionRates[currency]).toFixed(2);
  };

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Выдача билетов</h1>

        <div className="flex space-x-4 mb-4">
          {["USD", "RUB", "EUR"].map((cur) => (
              <button
                  key={cur}
                  onClick={() => setCurrency(cur as "USD" | "RUB" | "EUR")}
                  className={`px-4 py-2 border rounded ${
                      currency === cur ? "bg-[#a5b4fc] text-white" : "bg-gray-100"
                  }`}
              >
                {cur}
              </button>
          ))}
        </div>

        <div className="flex gap-8">
          <aside className="w-1/4">
            <Filter stopsFilter={stopsFilter} setStopsFilter={setStopsFilter}/>
          </aside>

          <main className="w-3/4 space-y-4">
            {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                    <TicketCard
                        key={ticket.id}
                        ticket={{
                          ...ticket,
                          price: Number(convertPrice(ticket.price)),
                        }}
                    />
                ))
            ) : (
                <p>Билеты не найдены.</p>
            )}
          </main>

        </div>
      </div>
  );
};

export default Home;

interface Ticket {
    id: number;
    price: number;
    stops: number;
    origin: string;
    destination: string;
}

interface TicketCardProps {
    ticket: Ticket;
    currency?: string;
}

const TicketCard = ({ ticket, currency = "$" }: TicketCardProps) => {
    return (
        <div className="border bg-white p-4 rounded-lg shadow-md cursor-pointer">
            <h3 className="text-lg font-bold text-[#be185d]">
                {ticket.origin} → {ticket.destination}
            </h3>
            <p>
                Цена: {currency} {ticket.price}
            </p>
            <p>Пересадок: {ticket.stops}</p>
        </div>
    );
};

export default TicketCard;

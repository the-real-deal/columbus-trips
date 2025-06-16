import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { LucideMailOpen, Trash } from "lucide-react";
import { useCallback, useState } from "react";
import useDbContext from "@/lib/useDbContext";

type TableProps = {
    className?: string;
};

type TicketDTO = {
    ticketId: string;
    operationTypeId: string;
    cityId: string;
    name: string;
    description: string;
    website: string;
    longitude: number;
    latitude: number;
    poiId: string | null;
    currentState: string;
    ticket: {
        id: string;
        openingDate: string;
        result: boolean;
        userId: string;
        ticketType: string;
    };
};

export default function TicketsTable({ className }: TableProps) {
    const [tickets, setTickets] = useState<TicketDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const dbInfo = useDbContext()

    const fetchTickets = () => {
        fetch(dbInfo.baseAddress().concat("/Ticket/all-poi-tickets"))
            .then(res => res.json())
            .then(data => {
                setTickets(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Errore nel fetch dei ticket:", err);
                setLoading(false);
            });
    }

    const handleDelete = useCallback((ticketId: string) => {
        setTickets(prev => prev.filter(t => t.ticketId !== ticketId));
    }, []);

    return (
        <div className={cn(className, "border-2 border-red rounded-sm")}>
            <Button onClick={() => fetchTickets()}>fetchTickets</Button>
            <table className="table-auto w-full text-center">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrizione</th>
                        <th>Stato</th>
                        <th>Utente</th>
                        <th>Data Apertura</th>
                        <th>Esito</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.length === 0 ? <p>Nessun ticket</p> : tickets.map(ticket => (
                        <tr key={ticket.ticketId}>
                            <td>{ticket.name}</td>
                            <td>{ticket.description}</td>
                            <td>{ticket.currentState}</td>
                            <td>{ticket.ticket.userId}</td>
                            <td>{new Date(ticket.ticket.openingDate).toLocaleDateString()}</td>
                            <td>{ticket.ticket.result ? "Accettato" : "Rifiutato"}</td>
                            <td>
                                <div className="py-1 flex gap-x-1 justify-center">
                                    <Button onClick={() => fetch(dbInfo.baseAddress().concat("/Ticket/open-poi-ticket?ticketId=" + ticket.ticketId + "&admin=Advanced"))}><LucideMailOpen /></Button>
                                    <Button onClick={() => fetch(dbInfo.baseAddress().concat("/Ticket/close-poi-ticket?ticketId=" + ticket.ticketId + "&admin=Advanced?accepted=" + ["true", "false"][Math.round(Math.random())]))}><Trash /></Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

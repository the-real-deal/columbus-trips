import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Delete, LucideMailOpen, Trash } from "lucide-react"

type TableProps = {
    className?: string,
    tickets?: any[]
}

export default function TicketsTable({ className, tickets }: TableProps) {
    const mockData: Array<{[k:string]: any}> = [
        {
            status: ["OPENED", "CLOSED", "PENDING", "REJECTED"][Math.floor(Math.random() * 3)],
            openingDate: new Date().toJSON(),
            lastEdit: new Date().toJSON(),
            openedBy: "Nicholas Magi",
            result: "Accepted",
            admin: "Gioele Foschi"
        },
        {
            status: ["OPENED", "CLOSED", "PENDING", "REJECTED"][Math.floor(Math.random() * 3)],
            openingDate: new Date().toJSON(),
            lastEdit: new Date().toJSON(),
            openedBy: "Nicholas Magi",
            result: "Accepted",
            admin: "Gioele Foschi"
        },
        {
            status: ["OPENED", "CLOSED", "PENDING", "REJECTED"][Math.floor(Math.random() * 3)],
            openingDate: new Date().toJSON(),
            lastEdit: new Date().toJSON(),
            openedBy: "Nicholas Magi",
            result: "Accepted",
            admin: "Gioele Foschi"
        },
        {
            status: ["OPENED", "CLOSED", "PENDING", "REJECTED"][Math.floor(Math.random() * 3)],
            openingDate: new Date().toJSON(),
            lastEdit: new Date().toJSON(),
            openedBy: "Nicholas Magi",
            result: "Accepted",
            admin: "Gioele Foschi"
        }
    ]

    return <div className={cn(className, "border-2 border-red rounded-sm")}>
        <table className="table-auto w-full text-center">
            <thead>
                <tr className="bg-(--primary)/20">
                    <th className="py-2">Stato</th>
                    <th className="py-2">Data di apertura</th>
                    <th className="py-2">Ultima modifica</th>
                    <th className="py-2">Aperto da</th>
                    <th className="py-2">Esito</th>
                    <th className="py-2">Responsabile</th>
                    <th className="py-2">Azioni</th>
                </tr>
            </thead>
            <tbody>
                { mockData.map(ticket => <tr>
                    { Object.keys(ticket).map(key => 
                        <td>{ticket[key]}</td>
                    )}
                    <td>
                        <div className="py-1 flex gap-x-1 justify-center">
                            <Button><Trash/></Button>
                            <Button><LucideMailOpen/></Button>
                            <Button><Delete/></Button>
                        </div>
                    </td>
                </tr>)}
            </tbody>
        </table>
    </div>
}
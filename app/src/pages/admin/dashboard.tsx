import ReviewList from "@/components/admin/review-list";
import TicketsTable from "@/components/admin/tickets-table";
import DefaultLayout from "@/components/layout/default-layout";

export default function AdminDashboard() {
    return <DefaultLayout>
        <h1 className="text-5xl">Bentornato, <span className="font-bold">Nicholas</span>!</h1>
        <hr className="mt-1 mb-5"/>
        <h2 className="text-3xl">I miei tickets</h2>
        <TicketsTable className="m-5"/>
        <h2 className="text-3xl">Tickets</h2>
        <TicketsTable className="m-5"/>
        <h2 className="text-3xl">Recensioni</h2>
        <ReviewList className="m-5"/>
    </DefaultLayout>
}
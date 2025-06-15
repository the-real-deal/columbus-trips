import DefaultLayout from "@/components/layout/default-layout";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import GroupForm from "@/components/group-form";
import { useCallback, useEffect, useState } from "react";
import useDbContext from "@/lib/useDbContext";

interface Group {
    id: string;
    name: string;
    description: string;
    groupPicture: string | null;
    groupType: "Invite-Only" | "Open" | string;
    leader: string;
}

export default function GroupsView() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState<Group[]>([]);
    const [myGroups, setMyGroups] = useState<Group[]>([]);
    const [loadingMy, setLoadingMy] = useState(true);
    const [loadingSearch, setLoadingSearch] = useState(false);

    const username = "PaoloBitta77"; // sostituisci con utente attuale dinamicamente se necessario
    const dbinfo = useDbContext();
    useEffect(() => {
        fetch(dbinfo.baseAddress().concat(`/Group/my-groups?username=${username}`))
            .then((res) => res.json())
            .then((data: Group[]) => setMyGroups(data))
            .catch((err) => console.error(err))
            .finally(() => setLoadingMy(false));
    }, [username]);

    // Funzione di ricerca gruppi remota
    const searchGroups = useCallback(() => {
        if (!searchQuery.trim()) {
            setSearchResult([]);
            return;
        }
        setLoadingSearch(true);
        fetch(dbinfo.baseAddress().concat(`/Group/search-group?groupname=${encodeURIComponent(searchQuery)}`))
            .then((res) => res.json())
            .then((data: Group[]) => setSearchResult(data))
            .catch((err) => console.error(err))
            .finally(() => setLoadingSearch(false));
    }, [searchQuery]);

    return (
        <DefaultLayout>
            <h2 className="text-3xl">I miei gruppi</h2>
            <table className="w-full my-3">
                <thead className="bg-[var(--primary)]/50">
                    <tr>
                        <th>Immagine</th>
                        <th>Nome gruppo</th>
                        <th>Tipologia</th>
                        <th>Descrizione</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {loadingMy ? (
                        <tr><td colSpan={5} className="py-5">Caricamento...</td></tr>
                    ) : myGroups.length === 0 ? (
                        <tr className="bg-slate-700/30"><td colSpan={5} className="py-5">NESSUN GRUPPO</td></tr>
                    ) : myGroups.map(group => (
                        <tr key={group.id}>
                            <td className="flex justify-center">
                                <img className="max-w-30" src={group.groupPicture ?? "/default-group.png"} alt={`Img di ${group.name}`} />
                            </td>
                            <td>{group.name}</td>
                            <td>{group.groupType}</td>
                            <td className="max-w-10 truncate">{group.description}</td>
                            <td><Button><LogOut /> Esci</Button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>

            <hr className="my-5" />

            <div className="grid grid-cols-2">
                <h2 className="text-3xl">Cerca gruppi</h2>
                <div className="flex justify-end gap-3">
                    <Button onClick={searchGroups}><Search /></Button>
                    <Input
                        className="max-w-50"
                        id="group"
                        type="text"
                        placeholder="Digita qui il nome..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <table className="w-full my-3">
                <thead className="bg-[var(--primary)]/50">
                    <tr>
                        <th>Immagine</th>
                        <th>Nome gruppo</th>
                        <th>Tipologia</th>
                        <th>Descrizione</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {loadingSearch ? (
                        <tr><td colSpan={5} className="py-5">Ricerca in corso...</td></tr>
                    ) : searchResult.length === 0 ? (
                        <tr className="bg-slate-700/30"><td colSpan={5} className="py-5">NESSUN RISULTATO</td></tr>
                    ) : searchResult.map(group => (
                        <tr key={group.id}>
                            <td className="flex justify-center">
                                <img className="max-w-30" src={group.groupPicture ?? "/default-group.png"} alt={`Img di ${group.name}`} />
                            </td>
                            <td>{group.name}</td>
                            <td>{group.groupType}</td>
                            <td className="max-w-10 truncate">{group.description}</td>
                            <td><Button><LogIn /> Unisciti</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <hr className="my-5" />

            <section className="grid lg:grid-cols-5">
                <h2 className="text-6xl lg:col-span-2 flex flex-col justify-center">Nuovo gruppo</h2>
                <div className="lg:col-span-3"><GroupForm /></div>
            </section>
        </DefaultLayout>
    );
}

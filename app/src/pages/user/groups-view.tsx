
import DefaultLayout from "@/components/layout/default-layout";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import useDbContext from "@/lib/useDbContext";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    const [form, setForm] = useState({ name: "", description: "", groupType: "Open" });
    const [formLoading, setFormLoading] = useState(false);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);

    const username = "PaoloBitta77"; // Sostituire dinamicamente se necessario
    const dbinfo = useDbContext();

    // Caricamento gruppi dell’utente
    useEffect(() => {
        fetch(dbinfo.baseAddress().concat(`/Group/my-groups?username=${username}`))
            .then((res) => res.json())
            .then((data: Group[]) => setMyGroups(data))
            .catch((err) => console.error(err))
            .finally(() => setLoadingMy(false));
    }, [username]);

    // Ricerca gruppi
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

    // Submit nuovo gruppo
    const handleCreateGroup = async () => {
        setFormLoading(true);
        setFormSuccess(null);
        try {
            const response = await fetch(dbinfo.baseAddress().concat("/Group/new-group"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    description: form.description,
                    groupType: form.groupType,
                    leader: username,
                }),
            });

            if (!response.ok) throw new Error("Errore nella creazione del gruppo");

            const data = await response.json();
            setFormSuccess("Gruppo creato con successo!");
            setForm({ name: "", description: "", groupType: "Open" });

            // aggiorna lista dei miei gruppi
            setMyGroups((prev) => [...prev, data]);
        } catch (err) {
            console.error(err);
            setFormSuccess("Errore durante la creazione.");
        } finally {
            setFormLoading(false);
        }
    };

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
                                <img className="max-w-30" src={group.groupPicture ?? import.meta.env.BASE_URL.concat("login-images/people.png")} alt={`Img di ${group.name}`} />
                            </td>
                            <td>{group.name}</td>
                            <td>{group.groupType}</td>
                            <td className="max-w-10 truncate">{group.description}</td>
                            <td><Button variant="destructive"><LogOut /> Esci</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <hr className="my-5" />

            <div className="grid grid-cols-2">
                <h2 className="text-3xl">Cerca gruppi</h2>
                <div className="flex justify-end gap-3">
                    <Button onClick={searchGroups}><Search /></Button>
                    <Input
                        className="max-w-50"
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

            <section className="grid lg:grid-cols-5 gap-4">
                <h2 className="text-6xl lg:col-span-2 flex flex-col justify-center">Nuovo gruppo</h2>
                <div className="lg:col-span-3 space-y-4">
                    <div>
                        <Label htmlFor="name">Nome gruppo</Label>
                        <Input
                            id="name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Es. Amici del calcetto"
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Descrizione</Label>
                        <Textarea
                            id="description"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            placeholder="Descrivi il gruppo..."
                        />
                    </div>
                    <div>
                        <Label>Tipologia</Label>
                        <Select
                            value={form.groupType}
                            onValueChange={(value) => setForm({ ...form, groupType: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleziona tipologia" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Public">Public</SelectItem>
                                <SelectItem value="Invite-Only">Invite-Only</SelectItem>
                                <SelectItem value="Private">Private</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button onClick={handleCreateGroup} disabled={formLoading}>
                        {formLoading ? "Creazione..." : "Crea gruppo"}
                    </Button>

                    {formSuccess && (
                        <p className={`text-sm ${formSuccess.includes("successo") ? "text-green-500" : "text-red-500"}`}>
                            {formSuccess}
                        </p>
                    )}
                </div>
            </section>
        </DefaultLayout>
    );
}

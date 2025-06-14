import DefaultLayout from "@/components/layout/default-layout";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import GroupForm from "@/components/group-form";
import { useCallback, useState } from "react";

export default function GroupsView() {
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const searchGroups = useCallback(() => {
        console.log(searchResult)
    }, [searchQuery])

    return <DefaultLayout>
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
                <tr>
                    <td className="flex justify-center"><img className="max-w-30" src="/login-images/01.avif" /></td>
                    <td>The Real Deal</td>
                    <td>SU INVITO</td>
                    <td className="max-w-10 truncate">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus inventore tempora excepturi perspiciatis culpa accusamus fugiat dolores vitae, quo libero, natus accusantium quia, reiciendis id laudantium ullam quibusdam! Ipsum, rem.
                        Ut exercitationem voluptatem maiores in numquam eaque iure velit quasi tempora ipsum eius odio ab, recusandae consequuntur maxime cumque veniam quas voluptates! At, repellendus repudiandae eos deleniti delectus alias inventore!
                        Obcaecati esse totam officia pariatur repellendus ipsa quae aperiam. Voluptatum maiores et nemo voluptates. Tenetur sed animi sint, quia aspernatur sequi. Laboriosam nostrum consequuntur maxime iusto sunt deserunt aspernatur! Qui.
                        Repudiandae ipsam quia earum libero explicabo id delectus! Repudiandae asperiores atque voluptatum neque quae earum cumque ratione expedita esse quam! Ea ab ex minima ipsa eius facilis, optio tempore nobis!
                        Illum at numquam voluptas reprehenderit, itaque a suscipit explicabo neque eius deserunt laudantium exercitationem quos! Adipisci ducimus excepturi consequuntur quas possimus optio odio facilis delectus? Ad sint quam error dignissimos?
                        Consectetur, soluta adipisci, tempore beatae repellat reiciendis, obcaecati officia sit amet aut expedita. Quidem excepturi alias dolor veniam et, ipsam ab rerum similique rem iure nam laboriosam recusandae quasi repudiandae.
                        Quam reiciendis, dignissimos amet earum quisquam qui minima vel perferendis ipsa. Similique, inventore nulla? Rerum quo corporis quam quia iusto repellat? Provident iste, assumenda fuga commodi quas repellendus consectetur harum.
                        Dignissimos dolor, optio eius perspiciatis officia quod, libero soluta id ipsa magnam dolorum? Soluta deserunt provident aspernatur praesentium. Cupiditate delectus reiciendis temporibus sequi, eaque praesentium eos ducimus at necessitatibus deleniti.
                        Nihil veritatis totam neque, dolor cumque molestias quasi nam eius voluptate excepturi. Perspiciatis animi dolorem fugit iste aliquam eveniet rem ex, laboriosam cupiditate exercitationem ea, consectetur, dicta voluptatum. Odit, ratione!
                        Laborum consequatur harum necessitatibus assumenda eos blanditiis accusantium consequuntur, magnam, iure fugiat cupiditate saepe fugit, deserunt minima corporis aspernatur cum! Id, perspiciatis quam ducimus consequatur optio omnis tenetur error eligendi?
                    </td>
                    <td>
                        <Button><LogOut /> Esci</Button>
                    </td>
                </tr>
            </tbody>
        </table>
        <hr className="my-5" />
        <div className="grid grid-cols-2">
            <h2 className="text-3xl">Cerca gruppi</h2>
            <div className="flex justify-end gap-3">
                <Button onClick={() => searchGroups()}><Search /></Button>
                <Input
                    className="max-w-50"
                    id="group"
                    type="text"
                    placeholder="Digita qui il nome..."
                    required
                    onChange={(e) => setSearchQuery(e.target.value)} />
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
                { searchResult.length === 0 ?
                    <tr className="bg-slate-700/30">
                        <td className="py-5" colSpan={5}>NESSUN RISULTATO</td>
                    </tr> :
                    <tr>
                        <td className="flex justify-center"><img className="max-w-30" src="/login-images/02.avif" /></td>
                        <td>Eco Travellers</td>
                        <td>APERTO</td>
                        <td className="max-w-10 truncate">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus inventore tempora excepturi perspiciatis culpa accusamus fugiat dolores vitae, quo libero, natus accusantium quia, reiciendis id laudantium ullam quibusdam! Ipsum, rem.
                            Ut exercitationem voluptatem maiores in numquam eaque iure velit quasi tempora ipsum eius odio ab, recusandae consequuntur maxime cumque veniam quas voluptates! At, repellendus repudiandae eos deleniti delectus alias inventore!
                            Obcaecati esse totam officia pariatur repellendus ipsa quae aperiam. Voluptatum maiores et nemo voluptates. Tenetur sed animi sint, quia aspernatur sequi. Laboriosam nostrum consequuntur maxime iusto sunt deserunt aspernatur! Qui.
                            Repudiandae ipsam quia earum libero explicabo id delectus! Repudiandae asperiores atque voluptatum neque quae earum cumque ratione expedita esse quam! Ea ab ex minima ipsa eius facilis, optio tempore nobis!
                            Illum at numquam voluptas reprehenderit, itaque a suscipit explicabo neque eius deserunt laudantium exercitationem quos! Adipisci ducimus excepturi consequuntur quas possimus optio odio facilis delectus? Ad sint quam error dignissimos?
                            Consectetur, soluta adipisci, tempore beatae repellat reiciendis, obcaecati officia sit amet aut expedita. Quidem excepturi alias dolor veniam et, ipsam ab rerum similique rem iure nam laboriosam recusandae quasi repudiandae.
                            Quam reiciendis, dignissimos amet earum quisquam qui minima vel perferendis ipsa. Similique, inventore nulla? Rerum quo corporis quam quia iusto repellat? Provident iste, assumenda fuga commodi quas repellendus consectetur harum.
                            Dignissimos dolor, optio eius perspiciatis officia quod, libero soluta id ipsa magnam dolorum? Soluta deserunt provident aspernatur praesentium. Cupiditate delectus reiciendis temporibus sequi, eaque praesentium eos ducimus at necessitatibus deleniti.
                            Nihil veritatis totam neque, dolor cumque molestias quasi nam eius voluptate excepturi. Perspiciatis animi dolorem fugit iste aliquam eveniet rem ex, laboriosam cupiditate exercitationem ea, consectetur, dicta voluptatum. Odit, ratione!
                            Laborum consequatur harum necessitatibus assumenda eos blanditiis accusantium consequuntur, magnam, iure fugiat cupiditate saepe fugit, deserunt minima corporis aspernatur cum! Id, perspiciatis quam ducimus consequatur optio omnis tenetur error eligendi?
                        </td>
                        <td>
                            <Button><LogIn/> Unisciti</Button>
                        </td>
                    </tr>
                }
            </tbody>
        </table>
        <hr className="my-5" />
        <section className="grid lg:grid-cols-5">
            <h2 className="text-6xl lg:col-span-2 flex flex-col justify-center">Nuovo gruppo</h2>
            <div className="lg:col-span-3">
                <GroupForm/>
            </div>
        </section>
    </DefaultLayout>
}
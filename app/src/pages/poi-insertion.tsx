import DefaultLayout from "@/components/layout/default-layout";
import POIForm from "@/components/poi-form";

export default function POIInsertion() {
    return <DefaultLayout>
        <h1 className="text-5xl text-center">Inserisci un nuovo <span className="font-bold">punto di interesse</span></h1>
        <POIForm/>
    </DefaultLayout>
}
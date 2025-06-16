import DefaultLayout from "@/components/layout/default-layout";
import PopularDestinations from "@/components/popular-destinations/popular-destionations";
import InterestingActivities from "@/components/interesting-activities";

export default function Home() {
    return <DefaultLayout className="py-0">
        <PopularDestinations className="pt-5"/>
        <InterestingActivities username="PaoloBitta77" className="py-10"/>
    </DefaultLayout>
}
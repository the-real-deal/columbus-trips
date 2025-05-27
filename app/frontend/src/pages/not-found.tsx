import DefaultLayout from "@/components/layout/default-layout";

export default function NotFound() {
    return <DefaultLayout className="flex justify-center align-center">
        <div className="flex flex-col justify-center gap-4 text-center">
            <code className="text-4xl">Error: 404</code> 
            <h1 className="text-6xl">Not Found!</h1>
            <small>(or not implemented yet)</small>
        </div>
    </DefaultLayout>
}
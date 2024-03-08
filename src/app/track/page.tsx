import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const NewActivity = () => {
    return (
        <div>
            <h2>Task</h2>
            <form className="flex items-center space-x-4">
                <Input name="name"/>
                <Button type="submit">Start</Button>
            </form>
        </div>
    )
}

const DailyActivities = () => {

}

export default async function TrackPage() {
    return (
        <main className="mx-auto container py-4">
            <NewActivity />
        </main>
    )
}
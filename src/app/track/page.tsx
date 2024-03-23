import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getServerSession } from "next-auth"
import { prisma } from "../../../lib/prisma"
import { revalidatePath } from "next/cache"
import { getUserSession } from "@/lib/auth"

const Time = ({ startAt }) => {
    const date = new Date(startAt)
    const elapsed = (new Date()).getTime() - date.getTime()
    return (
        <div>
            [elapsed]
        </div>
    )
}

const NewActivity = ({ activity }) => {
    async function createActivity(data) {
        "use server"

        const user = await getUserSession()
        const activity = await prisma.activity.create({
            data: {
                userId: user.id,
                name: data.get('name'),
                startAt: new Date()
            }
        })
        revalidatePath('/track')
    }

    async function stopActivity(data: FormData) {
        "use server"

        await prisma.activity.update({
            where: {
                id: data.get('id') as string
            },
            data: {
                endAt: new Date()
            }
        })
        revalidatePath("/track")
    }
    return (
        <div>
            <h2>Task</h2>
            <form className="flex items-center space-x-4">
                <Input name="name" />
                {activity && <Time startAt={activity.startAt}/>}
                <Button type="submit">Start</Button>
            </form>
        </div>
    )
}

const DailyActivities = () => {

}

export default async function TrackPage() {
    const user = await getUserSession()
    const currentActivity = await prisma.activity.findFirst({
        where: {
            tenantId: user.tenantId,
            userId: user.id,
            endAt: null,
        }
    })
    return (
        <main className="mx-auto container py-4">
            <NewActivity activity={currentActivity}/>
        </main>
    )
}
import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/presentation/components/ui/card";

export default function Home() {
    return (
        <div className="flex flex-col p-5 h-screen min-h-max">
            <h1 className="text-center text-5xl font-bold p-10">Hello Rojen</h1>

            <section className="flex flex-row h-full gap-5 overflow-auto">
                <Card className="w-96 h-full relative">
                    <CardHeader className="font-bold">Todo</CardHeader>
                    <CardContent>
                        <Card className="p-2 cursor-pointer">
                            <CardContent className="font-medium px-2">
                                This is a task
                            </CardContent>

                        </Card>
                    </CardContent>
                    <CardFooter className="border mt-5 py-2 absolute bottom-0 left-0 right-0"><Button variant="secondary" className="w-full">Add a Task</Button></CardFooter>

                </Card>
                
                <Card className="w-96 h-full relative">
                    <CardHeader className="font-bold">Todo</CardHeader>
                    <CardContent>
                        <Card className="p-2 cursor-pointer">
                            <CardContent className="font-medium px-2">
                                This is a task
                            </CardContent>

                        </Card>
                    </CardContent>
                    <CardFooter className="border mt-5 py-2 absolute bottom-0 left-0 right-0"><Button variant="secondary" className="w-full">Add a Task</Button></CardFooter>

                </Card>
            </section>




        </div>
    )
}
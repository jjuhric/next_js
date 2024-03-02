import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createTodo(data: FormData) {
    "use server";

    const title = data.get("title")?.valueOf() as string;
    if(!title) throw new Error("Title is required");

    await prisma.todo.create({ data: { title, complete: false } })
    redirect("/");
}

export default function Page() {
    return <>
        <header className="flex justify-between items-center mb-4">
            <h1 className="text-2xl">New</h1>
        </header>
        <form className="flex gap-2 flex-col" action={createTodo}>
            <input type="text" name="title" className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100" />
            <div className="flex gap-1 justify-end">
                <Link href=".." className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Cancel</Link>
                <button type="submit" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Save</button> 
            </div>
        </form>
    </>
}
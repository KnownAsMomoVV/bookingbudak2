import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import experiences from "@/lib/experiences.json";
import me from "@/lib/img/me.png";
import projects from "@/lib/projects.json";
import { AtSign, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Signup } from "@/components/signup";
import { ThemeProvider } from 'next-themes';

export default function Home() {
    const name = [
        { text: "Momo" },
        { text: "test" },
    ]

    return (
        <div>
            <Signup />
        </div>
    )
}

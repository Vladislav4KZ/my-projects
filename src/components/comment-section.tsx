
"use client"

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Dictionary = {
    discussions: string,
}

export function CommentSection({ dictionary, lang }: { dictionary: Dictionary, lang: string }) {
  const { theme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">{dictionary.discussions}</CardTitle>
      </CardHeader>
      <CardContent>
        <Giscus
          repo="Vladislav4KZ/my-projects"
          repoId="R_kgDOMf063Q"
          category="Project Discussions"
          categoryId="DIC_kwDOMf063c4ChgqA"
          mapping="title"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={theme === "dark" ? "dark" : "light"}
          lang={lang}
          loading="lazy"
        />
      </CardContent>
    </Card>
  );
}

type SeoJsonLdProps = {
  data: Record<string, unknown>;
};

export function SeoJsonLd({ data }: SeoJsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

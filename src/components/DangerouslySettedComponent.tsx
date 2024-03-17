export default function DangerouslySettedComponent({
  content,
}: {
  content: string;
}) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

import styled from "@emotion/styled";
import DangerouslySettedComponent from "@/components/DangerouslySettedComponent";
import { parseToHTML } from "@/utils/parseToHTML";

export default function TodoContent({ content }: { content: string }) {
  const parsedHTML = parseToHTML(content);

  return (
    <Container>
      <DangerouslySettedComponent content={parsedHTML} />
    </Container>
  );
}

const Container = styled.div`
  line-height: 1.5;
`;

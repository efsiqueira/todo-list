import { Container } from "../components/container"
import Logo from "../assets/images/logo.svg?react"

export const Header = () => {
  return (
    <Container as="header" className="mt-3 md:mt-20">
      <Logo className="h-9 md:h-16" />
    </Container>
  )
}
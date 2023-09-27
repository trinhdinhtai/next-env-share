interface TitleProps {
  children: React.ReactNode
}

export const Title = ({ children }: TitleProps) => {
  return (
    <h1 className="bg-gradient-to-t from-zinc-100/60 to-white bg-clip-text py-4 text-center text-5xl font-bold text-transparent">
      {children}
    </h1>
  )
}

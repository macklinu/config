declare const Link: (props: { to: string; target?: string; children: string }) => unknown

export const link = (
  <Link to='https://example.com' target='_blank'>
    External
  </Link>
)
export const browser = document.title + window.location.href + self.location.href
export const server = process.pid + Buffer.byteLength('x')
export const flag = customBuildFlag
export const missing = unknownWorkspaceGlobal

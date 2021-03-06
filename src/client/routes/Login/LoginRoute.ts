import { Loading } from '@components'
import { reactImportedComponent } from '@lib'
import Radar from '@Login/Radar'

const component = reactImportedComponent(() => import('./LoginPage'), {
  LoadingComponent: Loading,
})

export default {
  component,
  path: '/login',
  routes: [Radar],
}

import { Loading } from '@components'
import { reactImportedComponent, toPath } from '@lib'
import { Params } from '.'

const component = reactImportedComponent(() => import('./RadarPage'), {
  LoadingComponent: Loading,
})

const path = '/login/radar/:id?'

export default {
  path,
  component,
  to: toPath<Params>(path),
  exact: true,
}

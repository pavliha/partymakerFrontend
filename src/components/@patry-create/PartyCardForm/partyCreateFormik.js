import { withFormik } from 'formik'
import * as Yup from 'yup'

const partyCreateFormik = withFormik({
  validationSchema: Yup.object().shape({}),
  mapPropsToValues: () => ({
    district: '',
    address: {},
    time: '',
    after: '',
    before: '',
    description: '',
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.actions.party.partyCardForm(values)
    props.actions.stepper.stepperNavigationNext(props.activeStep)
    setSubmitting(false)
  },
  displayName: 'PartyCreate',
})

export default partyCreateFormik
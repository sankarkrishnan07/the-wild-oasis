import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import PropTypes from "prop-types";
import { useCabins } from "../cabins/useCabins";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import StyledCheckbox from "../../ui/StyledCheckbox";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { subtractDates } from "../../utils/helpers";
import useSettings from "../settings/useSettings";

function CreateBookingForm({ onClose }) {
  const [cabinName, setCabinName] = useState("001");

  const { isLoading, cabins } = useCabins();
  const { isLoading: isSettingsLoading, settings } = useSettings();
  const { register, formState, handleSubmit } = useForm();

  if (isLoading || isSettingsLoading) return <Spinner />;

  const cabinOptions = cabins.map((cabin) => {
    {
      return {
        label: `Cabin ${cabin.name}`,
        value: cabin.name,
      };
    }
  });

  function onSubmit(data) {
    const startDate = data.startDate.toISOString();
    const endDate = data.endDate.toISOString();
    const numNights = subtractDates(endDate , startDate);
    const selectedCabin = cabins.find((cabin) => cabin.name === cabinName);
    const cabinPrice =
      numNights * (selectedCabin.regularPrice - selectedCabin.discount);
    const extrasPrice = data.hasBreakfast
      ? numNights * settings.breakfastPrice * data.numGuests
      : 0;
    const totalPrice = cabinPrice + extrasPrice;

    const newBooking = {
      created_at: new Date().toISOString(),
      ...data,
      startDate,
      endDate,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
    };

    console.log(newBooking, startDate);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onClose ? "modal" : ""}>
      <FormRow label="Start Date">
        <Input
          type="date"
          id="startDate"
          {...register("startDate", { valueAsDate: true })}
        />
      </FormRow>
      <FormRow label="End Date">
        <Input
          type="date"
          id="endDate"
          {...register("endDate", { valueAsDate: true })}
        />
      </FormRow>
      <FormRow label="Cabin Name">
        <Select
          options={cabinOptions}
          value={cabinName}
          onChange={(e) => setCabinName(e.target.value)}
        />
      </FormRow>
      <FormRow label="Number of Guests">
        <Input type="number" id="numGuests" {...register("numGuests")} />
      </FormRow>
      <FormRow label="Notes">
        <Input type="text" id="obsservations" {...register("obsservations")} />
      </FormRow>
      <FormRow label="Need Breakfast?">
        <StyledCheckbox>
          <Input
            type="checkbox"
            id="hasBreakfast"
            {...register("hasBreakfast")}
          />
        </StyledCheckbox>
      </FormRow>
      <FormRow label="Paid?">
        <StyledCheckbox>
          <Input type="checkbox" id="isPaid" {...register("isPaid")} />
        </StyledCheckbox>
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={onClose}>
          Cancel
        </Button>
        <Button>Create Booking</Button>
      </FormRow>
    </Form>
  );
}

CreateBookingForm.propTypes = {
  onClose: PropTypes.func,
};

export default CreateBookingForm;

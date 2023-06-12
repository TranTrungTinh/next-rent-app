'use client'

import { useRouter, useSearchParams } from "next/navigation";
import Modal from "./Modal";
import { useSearchModal } from "@/app/hooks/useSearchModal";
import { useCallback, useMemo, useState } from "react";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import { Range } from 'react-date-range';
import dynamic from "next/dynamic";
import { formatISO, set } from "date-fns";
import queryString from "query-string";
import Heading from "../Heading";
import DatePicker from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEP {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {

  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [step, setStep] = useState(STEP.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathRoomCount, setBathRoomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), []);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onsubmit = useCallback(() => {
    if (step !== STEP.INFO) {
      return onNext();
    }

    const updatedQuery: any = {
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathRoomCount,
    }

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = queryString.stringifyUrl({
      url: '/',
      query: {
        locationValue: params?.get('locationValue'),
        roomCount: params?.get('roomCount'),
        bathRoomCount: params?.get('bathRoomCount'),
        guestCount: params?.get('guestCount'),
        startDate: params?.get('startDate'),
        endDate: params?.get('endDate'),
        category: params?.get('category'),
        ...updatedQuery,
      },
    }, { skipNull: true });

    setStep(STEP.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    location,
    guestCount,
    roomCount,
    bathRoomCount,
    dateRange,
    params,
    onNext,
    router,
    searchModal,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEP.INFO) {
      return 'Search';
    }

    return 'Next';
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEP.INFO) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where are you going?"
        subtitle="Explore nearby stays to get inspired"
      />

      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />

      <hr />

      <Map center={location?.latlng} />
    </div>
  )

  if (step === STEP.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where do you plan to go?"
          subtitle="Add dates for prices and availability"
        />

        <DatePicker
          value={dateRange}
          onChange={(value) => setDateRange(value.selection as Range)}
        />
      </div>
    )
  }

  if (step === STEP.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="More information?"
          subtitle="Find the perfect place for you and your family"
        />
        <Counter
          title="Guests"
          subtitle="How many guests?"
          value={guestCount}
          onChange={value => setGuestCount(value)}
        />
        <hr />
        <Counter
          title="Rooms Count"
          subtitle="How many rooms?"
          value={roomCount}
          onChange={value => setRoomCount(value)}
        />
        <hr />
        <Counter
          title="Bathrooms Count"
          subtitle="How many bahtrooms do you need?"
          value={bathRoomCount}
          onChange={value => setBathRoomCount(value)}
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      onClose={searchModal.onClose}
      actionLabel={actionLabel}
      onSubmit={onsubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step !== STEP.LOCATION ? onBack : undefined}
      body={bodyContent}
    />
  );
}

export default SearchModal;
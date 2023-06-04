'use client'

import useCountries from '@/app/hooks/useCountries';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react';

import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';
import { SafeListing, SafeUser } from '@/app/types';

interface ListingCardProps {
  data: SafeListing;
  reservation?: Record<string, any>;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  actionId,
  actionLabel,
  disabled,
  onAction,
  reservation,
  currentUser
}) => {

  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (disabled || !actionId) return
    onAction?.(actionId)
  }, [disabled, actionId, onAction])

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }
    return data.price
  }, [data, reservation])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation])

  const goDetail = useCallback(() => {
    router.push(`/listings/${data.id}`)
  }, [data, router])

  return (
    <div
      className='col-span-1 cursor-pointer group'
    >
      <div
        className='aspect-square w-full relative overflow-hidden rounded-xl'
      >
        <Image
          onClick={goDetail}
          fill
          className='
            object-cover
            h-full
            w-full
            group-hover:scale-110
            transition
          '
          src={data.imageSrc}
          alt='Listing'
        />
        <div className='absolute top-3 right-3'>
          <HeartButton
            listingId={data.id}
            currentUser={currentUser}
          />
        </div>

      </div>
      <div className='font-semibold text-lg'>
        {location?.region}, {location?.label}
      </div>

      <div className='font-light text-neutral-500'>
        {reservation || data.category}
      </div>

      <div className="flex flex-row items-center gap-1">
        <div className="font-semibold">
          $ {price}
        </div>
        {!reservation && (
          <div className="font-light">night</div>
        )}
      </div>

      {onAction && actionLabel && (
        <Button
          disabled={disabled}
          small
          label={actionLabel}
          onClick={handleCancel}
        />
      )}
    </div>
  );
}

export default ListingCard;
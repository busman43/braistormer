import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useSubscription } from '../hooks/useSubscription';
import { stripePromise } from '../lib/stripe';

const schema = z.object({
  email: z.string().email(),
  plan: z.enum(['pro', 'team']),
  cardHolder: z.string().min(2),
});

type FormValues = z.infer<typeof schema>;

export function CheckoutPage() {
  const { upgrade } = useSubscription();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { plan: 'pro' },
  });

  const onSubmit = async (values: FormValues) => {
    await stripePromise;
    upgrade(values.plan);
    toast.success(`Upgraded to ${values.plan.toUpperCase()} (mock Stripe checkout complete).`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-lg space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
      <h1 className="text-lg font-semibold">Stripe Checkout</h1>
      <label className="block text-sm">Email
        <input className="mt-1 w-full rounded border border-slate-700 bg-slate-950 p-2" {...register('email')} />
        {errors.email && <p className="text-xs text-rose-300">{errors.email.message}</p>}
      </label>
      <label className="block text-sm">Plan
        <select className="mt-1 w-full rounded border border-slate-700 bg-slate-950 p-2" {...register('plan')}>
          <option value="pro">Pro - $19/mo</option>
          <option value="team">Team - $99/mo</option>
        </select>
      </label>
      <label className="block text-sm">Card Holder
        <input className="mt-1 w-full rounded border border-slate-700 bg-slate-950 p-2" {...register('cardHolder')} />
        {errors.cardHolder && <p className="text-xs text-rose-300">{errors.cardHolder.message}</p>}
      </label>
      <button disabled={isSubmitting} className="rounded bg-cyan-500 px-3 py-2 text-sm font-medium text-slate-950 disabled:opacity-50">Pay & Upgrade</button>
    </form>
  );
}

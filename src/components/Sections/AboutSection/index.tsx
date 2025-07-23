// Components
import { Text } from '@/components/commons';
import {
  IconProtection,
  IconQuantity,
  IconShipping,
  IconSupport,
} from '@/components';

export const ABOUT_ITEMS = [
  {
    icon: <IconQuantity />,
    title: 'High Quality',
    subtitle: 'crafted from top materials',
  },
  {
    icon: <IconProtection />,
    title: 'Warrany Protection',
    subtitle: 'Over 2 years',
  },
  {
    icon: <IconShipping />,
    title: 'Free Shipping',
    subtitle: 'Order over 150 $',
  },
  {
    icon: <IconSupport />,
    title: '24 / 7 Support',
    subtitle: 'Dedicated support',
  },
];

export const AboutSection = () => {
  return (
    <section className="flex w-full max-w-[1281px] mx-auto justify-between py-[72px]">
      {ABOUT_ITEMS.map((item, index) => (
        <div key={index} className="flex gap-4 items-center">
          {item.icon}
          <div>
            <Text className="font-medium text-[20px]">{item.title}</Text>
            <span>{item.subtitle}</span>
          </div>
        </div>
      ))}
    </section>
  );
};

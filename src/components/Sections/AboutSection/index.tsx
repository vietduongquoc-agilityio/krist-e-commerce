// Components
import { Text } from '@/components/commons';

// Constants
import { ABOUT_ITEMS } from '@/constants';

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

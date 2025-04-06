import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/user/userSlice';

export const useAuth = () => {
  const { user, isSignedIn } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSignedIn) {
      dispatch(setUser({
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
        avatar: user.profileImageUrl
      }));
    } else {
      dispatch(setUser(null));
    }
  }, [user, isSignedIn, dispatch]);

  return {
    isSignedIn,
    userId: isSignedIn ? user.id : null,
    userEmail: isSignedIn ? user.primaryEmailAddress?.emailAddress : null,
    userName: isSignedIn ? user.fullName : 'Guest',
    userAvatar: isSignedIn ? user.profileImageUrl : null
  };
};

export const requireAuth = (WrappedComponent) => {
  return (props) => {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isSignedIn) {
        navigate('/login', { state: { from: props.location } });
      }
    }, [isSignedIn, navigate, props.location]);

    return isSignedIn ? <WrappedComponent {...props} /> : null;
  };
};